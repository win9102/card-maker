class ImageUploader{
    
    async upload(file){
      const data = new FormData();
      data.append('file',file);
      data.append('upload_preset', 'bvb5oehj');
      const res = await fetch(
          'https://api.cloudinary.com/v1_1/business-card-maker/upload',
          {
            method: 'POST',
            body: data,
          }
      );
          return await res.json();
        }

}
export default ImageUploader;