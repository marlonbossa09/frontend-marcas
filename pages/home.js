import LayoutAuthenticated from "../components/layout-authenticated";
import styles from "../styles/styles.module.css";
import { useAuth } from "../hooks/useAuth";

export default function User() {
  const user = useAuth("/signin");

  if (!user) return <p>Cargando...</p>;

  return (
    <LayoutAuthenticated>
      <div className={styles.container}>
        <h1 className={styles.title}>User</h1>
        <p>{JSON.stringify(user)}</p>
      </div>
    </LayoutAuthenticated>
  );
}
