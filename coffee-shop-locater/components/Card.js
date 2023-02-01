import Image from 'next/image';
import Link from 'next/link';
import styles from './card.module.css';
import cls from 'classnames';
const Card = (props) => {
  return (
    <Link href={props.href}>
      <div className={cls('glass', styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{props.name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            className={styles.cardImage}
            src={props.imgUrl}
            width={260}
            height={160}
            alt={props.alt}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
