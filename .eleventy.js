module.exports = function (eleventyConfig) {
  // You can return your Config object (optional).
  eleventyConfig.setDataDeepMerge(true);
  // eleventyConfig.addCollection("allcontent", function (collectionApi) {
  //   return collectionApi.getAll();
  // });
  eleventyConfig.addWatchTarget("source/sass/");

  eleventyConfig.addPassthroughCopy("source/css");
  eleventyConfig.addPassthroughCopy("source/images");

  return {
    dir: {
      data: "_data",
      input: "source",
      output: "_site", // this is the default
    },
    passthroughFileCopy: true,
  };
};
