// import { useDarkmode } from "./context/mode"; // Ensure the path is correct

import { Button, SwitchButton } from "./components/_molecules";
import Header from "./components/header/header";
import Main from "./components/main/main";

export default function Home() {
  // const { darkMode, toggleDarkmode } = useDarkmode(); // Use the custom hook here
  // console.log(useDarkmode); // This should not be undefined


  return (
    <>
    <Header />
    <Main /> 
    </> 
  );
}

