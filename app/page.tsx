import { Button } from '@components/ui/button';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-8 space-y-8'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>
          Next.js + React Query + Axios
        </h1>
        <p className='text-muted-foreground mb-8'>
          Setup hoàn chỉnh với authentication, API calls và state management
        </p>
        <Button>Test Button</Button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl'></div>
    </div>
  );
}
