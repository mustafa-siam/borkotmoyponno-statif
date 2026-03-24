import React from 'react'
import { AboutBreadcrumb } from './AboutBreadcrumb/AboutBreadcrumb'
import AboutSection from '@/components/layout/Home/About/AboutSection/AboutSection';

export default function page() {
  return (
    <div>
      <AboutBreadcrumb />
      <AboutSection/>
    </div>
  );
}
