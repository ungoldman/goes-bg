const fs = require('fs')
const https = require('https')
const path = require('path')
const wallpaper = require('wallpaper')
const mkdirp = require('mkdirp')
const untildify = require('untildify')

const LATEST = 'https://cdn.star.nesdis.noaa.gov/GOES17/ABI/FD/GEOCOLOR/latest.jpg'

async function goesBG (opts = {}) {
  const outfile = untildify(opts.outfile || '~/Pictures/goes-bg/latest.jpg')

  // create outfile directory just in case
  mkdirp.sync(path.dirname(outfile))

  const file = fs.createWriteStream(outfile)

  console.log('Downloading latest image from NOAA...')

  https.get(LATEST, res => {
    res.pipe(file)
    file.on('finish', () => {
      file.close()
      console.log('Download complete!')
      console.log(`Setting ${outfile} as background...`)
      wallpaper.set(outfile, { screen: 'main', scale: 'fit' })
      console.log('Background set!')
    })
  })
}

module.exports = goesBG
