class DecodeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DecodeError";
  }
}

class FetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FetchError";
  }
}

class BlobError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BlobError";
  }
}

export { DecodeError, FetchError, BlobError };
