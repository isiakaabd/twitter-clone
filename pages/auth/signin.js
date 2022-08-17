import { getProviders, signIn } from "next-auth/react";
const signin = ({ providers }) => {
  return (
    <div className="flex items-center justify-center mt-20 space-x-4">
      <img
        alt="twitter"
        className=" hidden md:w-44 md:h-80  rotate-60 object-cover md:inline-flex"
        src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch11signup.png.twimg.1920.png"
      />
      <div>
        {Object.values(providers).map((provider, index) => {
          const { name, id } = provider;
          return (
            <div
              className="flex flex-col items-center justify-center"
              key={index}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png"
                alt="twitter logo"
                className=" w-36 object-cover"
              />
              <p className="text-center text-sm italic my-10">
                This App is created using NEXTJS
              </p>
              <button
                onClick={() => signIn(id, { callbackUrl: "/" })}
                className="bg-red-400 rounded p-3 text-white hover:bg-red-500 "
              >
                Sign in with {name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
