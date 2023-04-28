import Typewriter from 'typewriter-effect';
export default function Typer() {
  return(
  <Typewriter
    options={{
      loop: true,
      cursorClassName: 'Typewriter__cursor text-black',
      deleteSpeed: 50,
    }}
    onInit={(typewriter) => {
      typewriter
        .typeString('<b><span class="text-red-600">sad?</span></b> ')
        .pauseFor(1500)
        .deleteChars(5)
        .typeString('<b><span class="text-yellow-600">fearful?</span></b> ')
        .pauseFor(1500)
        .deleteChars(10)
        .typeString('<b><span class="text-green-600">happy?</span></b> ')
        .pauseFor(1500)
        .deleteChars(7)
        .typeString('<b><span class="text-blue-600">wistful?</span></b> ')
        .pauseFor(1500)
        .deleteChars(9)
        .start();
    }}
  />)
}