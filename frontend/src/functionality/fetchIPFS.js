export const fetchIPFS = async ({ tokenURI }) => {
  const metadata = await fetch(tokenURI);
  const metadataJSON = await metadata.json();
  console.log(metadataJSON);
  return JSON;
};
