const parseBase64Image = dataURI => {
  const [metadata, base64Str] = dataURI.split(',');
  const type = metadata.split('/')[1].split(';')[0];

  return { type, str: base64Str };
};

export default parseBase64Image;
