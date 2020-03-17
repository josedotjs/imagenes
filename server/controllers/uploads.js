const multer = require('multer')
const path = require('path')
const shortid = require('shortid')
const sharp = require('sharp')
const color = require('color')
const fs = require('fs')

// La carpeta de destino de las imagenes
const destPath = path.join(__dirname, '../public/images')

//Configuración del storage de multer
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destPath)
  },
  filename: (req, file, cb) => {
    const filename = `${shortid.generate()}${path.extname(file.originalname)}`
    cb(null, filename)
  },
})

// La opción de multer para las imagenes que subiremos, en multer se pueden crear multiples storages
const imageUpload = multer({storage: imageStorage})

exports.upload = [
  imageUpload.single('file'),
  (req, res, next) => {
    const extensions = ['jpg', 'webp', 'png', 'tiff']
    const files = extensions.map(
      ext => `${destPath}/${shortid.generate()}.${ext}`,
    )
    // const destFile = path.join(destPath, `/${shortid.generate()}.jpg`)
    const images = files.map(file => {
      return sharp(req.file.path).toFile(file)
    })
    Promise.all(images)
      .then(resp => {
        const imagesData = resp.map((imageInfo, idx) => {
          imageInfo.fileName = path.basename(files[idx])
          return imageInfo
        })
        console.log(imagesData)
        res.status(200).json(imagesData)
      })
      .catch(e => next(e))
  },
]

exports.resize = [
  imageUpload.single('file'),
  (req, res, next) => {
    const fits = Object.keys(sharp.fit)
    const options = fits.map(f => {
      return {
        fit: f,
        path: path.join(destPath, `${shortid.generate()}_${f}.webp`),
      }
    })
    const backColor = req.body.color || '#000000'
    const files = options.map(file => {
      return sharp(req.file.path)
        .resize({
          fit: file.fit,
          width: Number(req.body.width),
          height: Number(req.body.height),
          background: color(backColor).object(),
        })
        .webp()
        .toFile(file.path)
    })
    Promise.all(files)
      .then(results => {
        const response = options.map((opt, idx) => {
          opt.info = results[idx]
          opt.path = path.basename(opt.path)
          return opt
        })
        console.log(response)
        res.status(200).json(response)
      })
      .catch(e => next(e))
  },
]

exports.composition = [
  imageUpload.single('file'),
  (req, res, next) => {
    let watermark
    const whaterMarkFilePath = path.join(
      destPath,
      path.basename('banderabeerjs.svg'),
    )
    const destinationFile = path.join(destPath, `${+new Date()}.webp`)
    const imageInfo = sharp(req.file.path).metadata()

    imageInfo
      .then(metadata => {
        watermark = new Buffer.from(`<svg>
      <rect x="0" y="0" width="500" height="100" fill="rgba(0,0,0,0)"  text-align="center" />
      <text x="10" y="76" font-size="74" fill="${req.body.textColor}" font-family = "Verdana" 
      style="fill-opacity:1;stroke:#000000;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;">
      ${req.body.text}
      </text>
    </svg>`)
        return sharp(whaterMarkFilePath)
          .resize({
            width: metadata.width,
            height: metadata.height,
            fit: 'cover',
          })
          .toBuffer()
      })
      .then(bufferWM => {
        const file = sharp(req.file.path).composite([
          {
            input: bufferWM,
            gravity: 'east',
            blend: req.body.blend,
          },
          {
            input: watermark,
            gravity: req.body.gravity,
            tile: req.body.tile === 'true',
            blend: 'over',
          },
        ])
        file
          .webp()
          .toFile(destinationFile)
          .then(fileInfo => {
            res.status(200).json(path.basename(destinationFile))
          })
      })
      .catch(e => next(e))
  },
]

exports.gifs = [
  imageUpload.single('file'),
  (req, res, next) => {
    let results = []
    const destFile = path.join(destPath, `${+new Date()}.webp`)
    sharp(req.file.path, {pages: -1})
      .webp({
        fit_max_size: true,
      })
      .toFile(destFile)
      .then(imageData => {
        console.log(imageData)
        results.push({
          type: 'destino',
          format: imageData.format,
          size: imageData.size,
          fileName: path.basename(destFile),
        })
        Promise.all([
          sharp(req.file.path).metadata(),
          sharp(destFile).metadata(),
        ]).then(metadatas => {
          // console.log(metadatas)
          metadatas[0].fileName = path.basename(req.file.path)
          metadatas[1].fileName = path.basename(destFile)

          // metadatas[0].size = imageData.size
          // metadatas[1].size = imageData.size

          res.status(200).json({metadatas, results})
        })
      })
      .catch(e => next(e))
  },
]

exports.operations = [
  imageUpload.single('file'),
  (req, res, next) => {
    const operations = [
      {name: 'rotate', params: 60},
      {name: 'flip', params: true},
      {name: 'flop', params: true},
      {
        name: 'sharpen',
        params: 2,
      },
      {name: 'median', params: 10},
      {name: 'blur', params: 20},
      {
        name: 'flatten',
        params: {
          background: {r: 255, g: 0, b: 0},
        },
      },
      {
        name: 'convolve',
        params: {
          width: 3,
          height: 3,
          kernel: [-1, 0, 1, -2, 0, 2, -1, 0, 1],
        },
      },
      {
        name: 'threshold',
        params: 220,
      },
      {name: 'negate', params: true},
      {name: 'gamma', params: 3},
      {name: 'normalise', params: true},
      {
        name: 'linear',
        params: 10,
      },
      {
        name: 'recomb',
        params: [
          [0.3588, 0.7044, 0.1368],
          [0.299, 0.587, 0.114],
          [0.2392, 0.4696, 0.0912],
        ],
      },
      {
        name: 'modulate',
        params: {
          brightness: 0.5,
          saturation: 0.5,
          hue: 45,
        },
      },
      /*
      
      {name: 'normalise', params: {}},
      {name: 'linear', params: {}},
      {name: 'modulate', params: {}},
      */
    ]
    const destFiles = []
    const files = operations.map(operation => {
      const destFile = path.join(
        destPath,
        `${+new Date()}_${operation.name}.webp`,
      )
      destFiles.push(path.basename(destFile))
      const sharpObject = sharp(req.file.path)
      sharpObject[operation.name](operation.params)
      return sharpObject.webp().toFile(destFile)
    })
    Promise.all(files)
      .then(resp => {
        console.log(resp)
        const response = operations.map((operation, idx) => {
          return {
            operationName: operation.name,
            file: destFiles[idx],
          }
        })
        res.status(200).json(response)
      })
      .catch(e => next(e))
  },
]
exports.color = [
  imageUpload.single('file'),
  (req, res, next) => {
    const tintColor = req.body.color || '#000000'
    const alternatives = [
      {
        name: 'tint',
        options: color(tintColor).object(),
      },
      {
        name: 'greyscale',
        options: true,
      },
    ]
    const destFiles = []
    const files = alternatives.map(alternative => {
      const destFile = path.join(
        destPath,
        `${+new Date()}_${alternative.name}.webp`,
      )
      destFiles.push(path.basename(destFile))
      const sharpObject = sharp(req.file.path)
      sharpObject[alternative.name](alternative.options)
      return sharpObject.webp().toFile(destFile)
    })
    Promise.all(files)
      .then(data => {
        res.status(200).json(destFiles)
      })
      .catch(e => next(e))
  },
]
exports.pop = [
  imageUpload.single('file'),
  (req, res, next) => {
    sharp(req.file.path)
      .resize({
        width: 400,
        height: 400,
        fit: 'inside',
      })
      .toBuffer()
      .then(buffer => {
        sharp(buffer)
          .metadata()
          .then(metadata => {
            return {
              metadata,
              buffer,
            }
          })
          .then(({metadata, buffer}) => {
            const colors = ['yellow', 'orange', 'blue', 'red']
            const images = colors.map(color => {
              return sharp(buffer)
                .tint(color)
                .toBuffer()
            })
            Promise.all(images).then(createdImages => {
              const imagesToComposite = createdImages.map((image, idx) => {
                const isEven = idx % 2
                return {
                  input: image,
                  left: isEven ? 0 : metadata.width,
                  top: idx < 2 ? 0 : metadata.height,
                }
              })
              const destFile = path.join(destPath, `${+new Date()}_mix.webp`)
              sharp({
                create: {
                  width: metadata.width * 2,
                  height: metadata.height * 2,
                  background: 'white',
                  channels: 4,
                },
              })
                .composite(imagesToComposite)
                .toFile(destFile)
                .then(() => {
                  res.status(200).json(path.basename(destFile))
                })
                .catch(e => next(e))
            })
          })
      })
  },
]
