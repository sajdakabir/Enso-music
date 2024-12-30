const handleSpotifyLogin = async () => {
    console.log("Spotify login");

}

const InitialUi = () => {
    return (
        <section className="flex flex-col items-center justify-center h-screen">
            <div className="w-80 md:w-[500px] md:px-8 mx-auto">
            <div className="flex flex-row items-center gap-x-4 justify-center">
               <img height={35} width={35} src="/new_logo.png" alt="logo" />
               <h2 className="text-white text-base font-bold">Welcome to Enso</h2>
            </div>
            <div className="flex flex-col gap-3 mt-6 md:px-8 2xl:px-20">

               <button className="bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-semibold"
               onClick={handleSpotifyLogin}
               >
                Continue with Spotify
                
               </button>
            </div>
            </div>
        </section>
    )
}




function Login() {
  return (
    <div className="min-h-screen bg-[#1D1E22]">
      <InitialUi />
    </div>
  )
}

export default Login;
