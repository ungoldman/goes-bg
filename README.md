# goes-bg

This is a small command line program that sets the desktop background to the latest full disk geocolor image from GOES-17, a geostationary satellite operated by [NOAA](https://www.noaa.gov).

![GOES-16 BG](./example-16.jpg)

![GOES-17 BG](./example-17.jpg)

## Usage

```
npx goes-bg
```

### Help

```
goes-bg --help

Usage: goes-bg [options]

    --sat, -s             GOES Satellite to use (16 or 17). (default: 16)
    --outfile, -o         Location to save image. (default: ~/Pictures/goes-bg/latest.jpg)
    --help, -h            Show help.
```

## Support/Maintenance

This is released as-is as an experimental proof of concept, for educational purposes only. No support or maintenance, whether short-term, long-term, or otherwise, is planned on intended. Use at your own risk.

## License

Public Domain ([Creative Commons Zero v1.0 Universal](https://spdx.org/licenses/CC0-1.0.html))
