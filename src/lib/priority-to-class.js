const priorityToClassMap = [
  undefined,
  'very-low',
  'low',
  'medium',
  'high',
  'very-high',
];

export default function(priority) {
  return priorityToClassMap[priority];
}
