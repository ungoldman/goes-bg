const fs = require('fs')
const https = require('https')
const path = require('path')
const wallpaper = require('wallpaper')
const mkdirp = require('mkdirp')
const untildify = require('untildify')

const SATS = {
  16: 'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/latest.jpg',
  17: 'https://cdn.star.nesdis.noaa.gov/GOES17/ABI/FD/GEOCOLOR/latest.jpg'
}

/**
 * Get latest image from GOES{16,17}
 * @param {object} opts
 * @param {number} [opts.sat=16] one of 16,17
 * @param {string} [opts.outfile='~/Pictures/goes-bg/latest.jpg'] save path
 */
function goesBG (opts = {}) {
  const sat = opts.sat || 16
  const outfile = untildify(opts.outfile || `~/Pictures/goes-bg/latest-${sat}.jpg`)

  const url = SATS[sat]
  if (typeof url !== 'string') throw Error('invalid satellite')

  // create outfile directory just in case
  mkdirp.sync(path.dirname(outfile))

  const file = fs.createWriteStream(outfile)

  console.log(`Fetching latest GOES-${sat} image from NOAA...`)

  https.get(url, res => {
    res.pipe(file)
    file.on('finish', async () => {
      file.close()
      console.log('Download complete!')
      await sleep(250) // add delay to avoid flash of system bg
      console.log(`Setting ${outfile} as background...`)
      wallpaper.set(outfile, { screen: 'main', scale: 'fit' })
      console.log('Background set!')
    })
  })
}

// shh
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = goesBG
