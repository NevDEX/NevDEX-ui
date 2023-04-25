import { NFTStorage } from 'nft.storage'
const APIKEY = ''

async function pinJSONToIPFS() {
  const nftStorage = new NFTStorage({ token: APIKEY })
  try {
    const metaData = await nftStorage.store({
      name: 'Harmony NFT collection',
      description: 'This is a Harmony NFT collenction stored on IPFS & Filecoin.',
      image: inputFile,
    })
    let metaDataUrl = metaData.url
    console.log('metaDataUrl', metaDataUrl)
    return metaData
  } catch (error) {
    console.log(error)
  }
}

export { pinJSONToIPFS }
