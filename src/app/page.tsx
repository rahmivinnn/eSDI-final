'use client';

import GameTable from '@/components/GameTable';

export default function Home() {
  return (
    <>
      {/* Portrait warning for mobile */}
      <div className="portrait-warning">
        <div className="text-center">
          <div className="text-6xl mb-4">📱</div>
          <h1 className="text-2xl font-bold mb-2">Please Rotate Your Device</h1>
          <p className="text-lg">This game requires landscape orientation</p>
        </div>
      </div>

      {/* Main game */}
      <main className="w-full h-screen landscape-only">
        <GameTable />
      </main>
    </>
  );
}
