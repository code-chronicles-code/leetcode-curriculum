declare global {
  interface Console {
    meow: Console["log"];
  }
}

console.meow = function () {
  console.log.call(this, "😺", ...arguments);
};

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
