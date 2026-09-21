export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-semibold text-4xl">Settings</h1>
      <div className="mt-8 space-y-4 border border-ink/10 bg-white p-6 text-sm leading-7">
        <p>
          This demonstration uses a local database and a single admin account. Public pages read the
          same records that the admin dashboard writes.
        </p>
        <p>
          <strong>Admin email:</strong> {process.env.ADMIN_EMAIL || "admin@pmsaifworld.com"}
        </p>
        <p>
          Publishing a manager sets <code>status = published</code>. The public website queries only
          published records, so the directory and profile pages update as soon as they are refreshed.
        </p>
        <p className="text-ink-500">
          File uploads are stored in <code>public/uploads</code> for this demo. A production
          deployment can point the same schema at Supabase Postgres and Storage.
        </p>
      </div>
    </div>
  );
}
