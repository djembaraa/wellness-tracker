// components/layout/main-footer.tsx
import React from 'react';
import Link from 'next/link';

export function MainFooter() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container max-w-screen-lg py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-primary">EmergencyyCall</h3>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EmergencyyCall. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Customer Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}