import Loader from "react-loader-spinner";
import Div from "./SpinStyled";

const Spin = ({ spin }) => {
  console.log(spin);
  return (
    <Div>
      <Loader type="Hearts" color="#FC842D" height={80} width={80} />
    </Div>
  );
};

export default Spin;
