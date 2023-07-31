import css from './Button.module.css';


export function Button(props) {
  console.log(props)
  return (
    <div className={css.buttonWrapper}>
      <button type="button" className={css.button} onClick={props.onClick}>
        Load more
      </button>
    </div>
  );
};