export default function Badge({ severity, color, label, className = '' }) {
  let badgeColor = color || 'bg-gray-100 text-gray-800';
  let badgeLabel = label || severity;

  if (severity) {
    switch (severity.toUpperCase()) {
      case 'NOT HARMFUL':
        badgeColor = 'bg-secondary text-white';
        break;
      case 'MILD':
        badgeColor = 'bg-[#e8c56a] text-white';
        break;
      case 'MODERATE':
        badgeColor = 'bg-accent text-white';
        break;
      case 'SEVERE':
        badgeColor = 'bg-primary text-white';
        break;
      default:
        badgeColor = 'bg-gray-200 text-gray-700';
    }
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColor} ${className}`}>
      {badgeLabel}
    </span>
  );
}
