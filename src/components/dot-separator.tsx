export default function DotSeparator() {
  return (
    <div className="mb-5 flex flex-col gap-8 w-full items-center justify-center py-6">
      {/* Row 1 */}
      <div 
        className="h-1.5 w-full rounded-full bg-repeat-x bg-center" 
        style={{
          // Creates a 6px dot (3px radius) with transparent spacing
          backgroundImage: 'radial-gradient(circle, #04101C 3px, transparent 3.5px)',
          // 14px = 6px dot + 8px gap (matches your original gap-2)
          backgroundSize: '14px 14px' 
        }}
      />
      
      {/* Row 2 */}
      <div 
        className="h-1.5 w-full rounded-full bg-repeat-x bg-center" 
        style={{
          backgroundImage: 'radial-gradient(circle, #04101C 3px, transparent 3.5px)',
          backgroundSize: '14px 14px'
        }}
      />
    </div>
  );
}