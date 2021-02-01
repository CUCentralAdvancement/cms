export function loadCloudinary(): void {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(script);
}
