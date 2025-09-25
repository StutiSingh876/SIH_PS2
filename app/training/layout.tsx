import Navigation from '@/components/Navigation'

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <div className="lg:ml-64">
        {children}
      </div>
    </div>
  )
}
