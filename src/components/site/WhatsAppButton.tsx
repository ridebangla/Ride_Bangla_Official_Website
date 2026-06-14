const WHATSAPP_URL = "https://wa.me/8801309587749";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with Ride Bangla on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 ring-1 ring-black/5 transition hover:scale-105 hover:bg-[#1ebe5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-7 w-7"
        fill="currentColor"
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.802 2.722.802.658 0 2.092-.21 2.092-1.477 0-.087-.043-.144-.058-.215-.158-.387-1.49-.99-1.964-1.232ZM16.143 26.6c-1.69 0-3.348-.43-4.81-1.247l-3.36.917.927-3.34c-.93-1.51-1.41-3.24-1.41-5.012 0-5.32 4.32-9.63 9.65-9.63 5.33 0 9.65 4.31 9.65 9.63 0 5.32-4.32 9.63-9.65 9.63Zm0-20.91c-6.234 0-11.31 5.064-11.31 11.28 0 1.964.516 3.913 1.504 5.638L4.5 28.5l5.96-1.63a11.42 11.42 0 0 0 5.683 1.486c6.234 0 11.31-5.064 11.31-11.28 0-5.6-4.85-11.39-11.31-11.39Z" />
      </svg>
    </a>
  );
}