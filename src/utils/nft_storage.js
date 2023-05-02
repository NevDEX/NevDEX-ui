import { NFTStorage } from 'nft.storage'
const APIKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBBOTBFZjY0MTQ4ZEU5YjYyZDdmQzY1M0FFNzRCRDA5YzQ1MDI3NTYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MTE5NTA4MTM3MiwibmFtZSI6Im5mdCJ9.aZrGamJLzG75pRUGYZFyL17H7dVV5NJH5FrWT3bHd5Q'

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
