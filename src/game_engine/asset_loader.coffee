# Asset Loader
Loader =
  numberOfImages: 0
  numberComplete: 0
  images: {}

  loadImage: (key, src) ->
    Loader.numberOfImages++
    downloadingImage = new Image()
    downloadingImage.onload = () ->
      Loader.images[key] = downloadingImage
      Loader.numberComplete++
    downloadingImage.src = src

  getImage: (key) ->
    return Loader.images[key]

  getProgress: () ->
    return Loader.numberComplete / Loader.numberOfImages

  doneLoading: () ->
    return Loader.getProgress() == 1 # 100% done