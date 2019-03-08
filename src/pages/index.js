import styles from './index.css';
import {Button} from 'antd'
import Link from 'umi/link';


export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
     <Button><Link to="/login">登录页面</Link></Button> 
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            Getting Started
          </a>
        </li>
      </ul>
    </div>
  );
}
