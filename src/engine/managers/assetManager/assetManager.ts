import p5 from "p5";
import Assets from "./assets";
import AssetTypes from "./assetTypes";

class GlobalAssetManager {
  images: p5.Image[] = [];

  constructor() {}

  getImage(key) {
    return this.images[key];
  }

  loadAsset(key, url, type: AssetTypes, p: p5) {
    if (type == AssetTypes.IMAGE) {
      this.images[key] = p.loadImage(url);
    }
  }

  loadAssets(p: p5) {
    for (let i = 0; i < Object.keys(Assets).length; i++) {
      let key = Object.keys(Assets)[i];
      let obj = Assets[key];
      this.loadAsset(obj.key, obj.path, obj.type, p);
    }

    console.log(this);
  }
}

const AssetManager = new GlobalAssetManager();

export default AssetManager;
