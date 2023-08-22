import styles from "./styles/Header.module.css"
import rocketLogo from "./assets/rocket.svg"

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className="logo">
          <img src={rocketLogo} />
          <strong>
            to<span className={styles.purple}>do</span>
          </strong>
        </div>
      </header>
    </>
  )
}
