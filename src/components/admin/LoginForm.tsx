'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const payload = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setError(payload.error || 'Connexion refusée.');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Erreur réseau. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-text-dark mb-2">Connexion admin</h1>
      <p className="text-sm text-gray-500 mb-6">Accès réservé à l’équipe DNS Service.</p>

      <div className="space-y-4">
        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-1">Identifiant</span>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="admin"
            autoComplete="username"
            required
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-primary px-4 py-3 font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
      >
        {loading ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  );
};
