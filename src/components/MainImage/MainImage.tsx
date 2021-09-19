import styles from "./MainImage.module.css"

const MainImage = () => {
  return (
    <section>
      <div className={styles.main_image}>
        <h1 className={styles.title}>子ども✖︎先生のマッチングサービス
          <span className={styles.span}>自分にあった先生を見つける</span>
        </h1>
      </div>
    </section>
  )
}

export default MainImage
