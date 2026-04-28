import { EvolutionStablesButton } from "./evolution-stables-button";

// Example usage of the Evolution Stables branded button
export function ButtonUsageExample() {
  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Default button */}
      <EvolutionStablesButton>Default Button</EvolutionStablesButton>
      
      {/* Button with horizontal lockup */}
      <EvolutionStablesButton lockupType="horizontal" lockupSize="md">
        Button with Lockup
      </EvolutionStablesButton>
      
      {/* Variant buttons */}
      <EvolutionStablesButton variant="outline">Outline Button</EvolutionStablesButton>
      <EvolutionStablesButton variant="secondary">Secondary Button</EvolutionStablesButton>
      <EvolutionStablesButton variant="ghost">Ghost Button</EvolutionStablesButton>
      <EvolutionStablesButton variant="link">Link Button</EvolutionStablesButton>
      
      {/* Size variations */}
      <EvolutionStablesButton size="sm">Small Button</EvolutionStablesButton>
      <EvolutionStablesButton size="lg">Large Button</EvolutionStablesButton>
      <EvolutionStablesButton size="icon" aria-label="Icon Button">
        {/* Icon would go here */}
      </EvolutionStablesButton>
    </div>
  );
}