<template>
  <div class="container mx-auto text-left px-40 pt-20 text-gray-300 space-y-20">
    <div class=" ">
      <h1 class="text-5xl">Create New NFT</h1>
      <p class="my-10">You can set preferred display name, create your profile URL and manage other personal settings.</p>
    </div>

    <div class="uploadNFT_box_title">
      <h2>Image, Video, Audio, or 3D Model</h2>
      <p class="my-10">File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</p>
    </div>

    <div>
      <label class="block text-sm font-medium"> Cover photo </label>
      <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div class="space-y-1 text-center">
          <!--SUCCESS-->
          <div v-if="isSuccess">
            <ul class="list-unstyled">
              <li v-for="file in coverFile" :key="file.id">
                <img :src="file.url" :alt="file.originalName" />
              </li>
            </ul>
          </div>

          <div v-if="showUploadCover" class="flex text-sm text-gray-600">
            <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <input id="file-upload" multiple :name="uploadFieldName" type="file" class="sr-only" @change="coverFileChange($event.target.name, $event.target.files)" accept="image/*" />
            </label>
          </div>
        </div>
      </div>

      <!--FAILED-->
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
    </div>

    <div>
      <label for="about" class="block font-medium text-3xl"> Description </label>
      <div class="mt-1">
        <textarea v-model="description" rows="3" class="shadow-sm bg-transparent focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Description"></textarea>
      </div>
    </div>

      <button class="inline-flex w-full justify-center py-2  border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" @click="onCreate">Create</button>

  </div>
</template>

<script>
export default {
  name: 'create_nft',

  data() {
    return {
      showUploadCover: true,
    }
  },
}
</script>

<style scoped>
.uploadNFT_box_title {
  border-bottom: 1px solid var(--shadow-dark-color);
  margin-top: 4rem;
}

.uploadNFT_box_title h2 {
  font-size: 2.5rem;
  line-height: 0;
}

.uploadNFT_box_title p {
  font-size: 1.1rem;
  font-weight: 500;
}
</style>
