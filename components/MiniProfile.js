function MiniProfile() {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        className="w-16 h-16 object-cover rounded-full border p-[2px] "
        src="https://foto.wartaekonomi.co.id/files/arsip_foto_2019_11_16/otomotif_215524_small.webp"
        alt=""
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">asdadad</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram!</h3>
      </div>

      <button className="text-blue-400 text-sm font-semibold">Sign Out </button>
    </div>
  );
}

export default MiniProfile;
