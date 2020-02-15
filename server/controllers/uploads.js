const multer = require("multer");
const path = require("path");
const shortid = require("shortid");
const sharp = require("sharp");
const color = require("color");

// La carpeta de destino de las imagenes
const destPath = path.join(__dirname, "../public/images");

//Configuración del storage de multer
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    const filename = `${shortid.generate()}${path.extname(file.originalname)}`;
    cb(null, filename);
  }
});

// La opción de multer para las imagenes que subiremos, en multer se pueden crear multiples storages
const imageUpload = multer({ storage: imageStorage });

const extensions = ["jpg", "webp", "png"];
const files = extensions.map(ext => `${destPath}/${shortid.generate()}.${ext}`);

exports.upload = [
  imageUpload.single("file"),
  (req, res, next) => {
    // const destFile = path.join(destPath, `/${shortid.generate()}.jpg`)
    const images = files.map(file => {
      return sharp(req.file.path).toFile(file);
    });
    Promise.all(images).then(resp => {
      const imagesData = resp.map((imageInfo, idx) => {
        imageInfo.fileName = path.basename(files[idx]);
        return imageInfo;
      });
      console.log(imagesData);
      res.status(200).json(imagesData);
    });
  }
];

exports.resize = [
  imageUpload.single("file"),
  (req, res, next) => {
    // const fileDest = path.join(destPath, `${shortid.generate()}.webp`);
    const fits = ["cover", "contain", "fill", "inside", "outside"];
    const options = fits.map(f => {
      return {
        fit: f,
        path: path.join(destPath, `${shortid.generate()}.webp`)
      };
    });
    const backColor = req.body.color || "#000000";
    const files = options.map(file => {
      return sharp(req.file.path)
        .resize({
          fit: file.fit,
          width: Number(req.body.width),
          height: Number(req.body.height),
          background: color(backColor).object()
        })
        .webp()
        .toFile(file.path);
    });
    Promise.all(files).then(results => {
      const response = options.map((opt, idx) => {
        opt.info = results[idx];
        opt.path = path.basename(opt.path);
        return opt;
      });
      console.log(response);
      res.status(200).json(response);
    });
  }
];

exports.composition = [
  imageUpload.single("file"),
  (req, res, next) => {
    const whaterMarkFilePath = path.join(
      destPath,
      path.basename(req.body.waterMarkFileName)
    );
    const destinationFile = path.join(destPath, `${+new Date()}.webp`);
    const watermark = new Buffer(`<svg>
      <rect x="0" y="0" width="500" height="100" fill="rgba(0,0,0,0)"  />
      <text x="10" y="76" font-size="74" fill="#fff" font-family = "Verdana">${req.body.text}</text>
    </svg>`);
    const file = sharp(req.file.path).composite([
      {
        input: whaterMarkFilePath,
        gravity: req.body.gravity,
        tile: req.body.text === "true"
      },
      {
        input: watermark,
        gravity: "east"
      }
    ]);
    file
      .webp()
      .toFile(destinationFile)
      .then(fileInfo => {
        res.status(200).json(path.basename(destinationFile));
      });
  }
];

exports.gifs = [
  imageUpload.single("file"),
  (req, res, next) => {
    const destFile = path.join(destPath, `${+new Date()}.webp`);
    sharp(req.file.path, { pages: -1 })
      .toFile(destFile)
      .then(imageData => {
        console.log(imageData);
        res.status(200).json({
          path: path.basename(destFile),
          info: imageData
        });
      });
  }
];
