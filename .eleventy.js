module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  // You can return your Config object (optional).
  eleventyConfig.setDataDeepMerge(true);
  // eleventyConfig.addCollection("allcontent", function (collectionApi) {
  //   return collectionApi.getAll();
  // });
  eleventyConfig.addWatchTarget("source/css/");
  eleventyConfig.addWatchTarget("source/js/bundle/"); // TODO: watch only specific output file

  eleventyConfig.addPassthroughCopy("source/fonts");
  eleventyConfig.addPassthroughCopy("source/css");
  eleventyConfig.addPassthroughCopy("source/images");
  eleventyConfig.addPassthroughCopy({"source/js/bundle": "js"});
  eleventyConfig.addPassthroughCopy({ "source/_data/aemter.geojson": "data/aemter.geojson" });

  return {
    dir: {
      data: "_data",
      input: "source",
      output: "_site", // this is the default
    },
    passthroughFileCopy: true,
  };
};
