import { NFTStorage } from 'nft.storage'
const APIKEY = 
async function uploadNFTContent(inputFile) {
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

const getIPFSGatewayURL = (ipfsURL) => {
  let urlArray = ipfsURL.split('/')
  let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`
  return ipfsGateWayURL
}

export { uploadNFTContent, getIPFSGatewayURL }
