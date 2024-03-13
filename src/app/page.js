import styles from "./page.module.css";
import URLForm from "@/components/url-form";

export default function Home() {
  return (
    <main className={styles.main}>
      <URLForm />
    </main>
  );
}
