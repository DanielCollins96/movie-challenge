// https://github.com/academind/react-complete-guide-code/blob/09-fragments-portals-refs/code/03-working-with-portals/src/components/UI/ErrorModal.js

const Backdrop = (props) => {
  return <div className="fixed top-0 left-0 w-full h-screen z-10 bg-black bg-opacity-50" onClick={props.onConfirm} />;
};
const ModalOverlay = (props) => {
    return (
      <Card className={classes.modal}>
        <header className="bg-green-100 p-2">
          <h2>{props.movie.title}</h2>
        </header>
      </Card>
    );
  };

const MovieModal = (props) => {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          <Backdrop onConfirm={props.onConfirm} />,
          document.getElementById('backdrop-root')
        )}
        {ReactDOM.createPortal(
          <ModalOverlay
            title={props.title}
            message={props.message}
            onConfirm={props.onConfirm}
          />,
          document.getElementById('overlay-root')
        )}
      </React.Fragment>
    );
  };
  
  export default MovieModal;