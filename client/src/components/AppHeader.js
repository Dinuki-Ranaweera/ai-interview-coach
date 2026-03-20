export default function AppHeader() {
    return (
      <header className="sticky top-0 z-10 border-b border-blue-100 bg-gray-50/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 ring-1 ring-blue-600/20">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 12c0-4.142 3.358-7.5 7.5-7.5 4.142 0 7.5 3.358 7.5 7.5 0 4.142-3.358 7.5-7.5 7.5-4.142 0-7.5-3.358-7.5-7.5Z" stroke="#1D4ED8" strokeWidth="1.8"/>
                <path d="M8.2 12.15c.9-1.6 2.05-2.4 3.45-2.4 1.32 0 2.43.72 3.33 2.17" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M9.2 15.4c.72.5 1.6.75 2.65.75 1 0 1.88-.25 2.65-.75" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="text-sm font-semibold text-gray-900">AI Interview Coach</div>
          </div>
        </div>
      </header>
    );
  }