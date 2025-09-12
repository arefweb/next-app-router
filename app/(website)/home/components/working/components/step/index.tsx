import clsx from 'clsx';
import Image, { StaticImageData } from "next/image";

import styles from './styles.module.css';

interface Props {
  imgSrc: StaticImageData | string;
  count: string;
  title: string;
  description: string;
  className?: string;
}

function Step({ imgSrc, count, title, description, className = undefined }: Props) {
  return (
    <div className={clsx("p-4 flex flex-col items-center", !!className && className)}>
      <Image src={imgSrc} alt={count} className={styles.image} />
      <span className="text-gray-500 text-sm">
        {count}
      </span>
      <h4 className="text-xl font-bold text-gray-900">
        {title}
      </h4>
      <p className="pt-1 text-gray-500 max-w-[400px] text-center">
        {description}
      </p>
    </div>
  );
}

export default Step;