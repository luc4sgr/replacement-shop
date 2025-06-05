import { MachineDetails } from "@/components/machines/machine-details"

interface MachinePageProps {
  params: Promise<{ id: string }>
}

export default async function MachinePage({ params }: MachinePageProps) {
  const { id } = await params

  return (
    <main className="min-h-screen pt-16">
      <MachineDetails machineId={Number.parseInt(id)} />
    </main>
  )
}
