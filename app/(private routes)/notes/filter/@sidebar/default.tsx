import SidebarNotes from '@/components/SidebarNotes/SidebarNotes';

const tags = [
  'Todo',
  'Personal',
  'Work',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
];

const NotesSidebar = async () => {
  return (
    <div>
      <SidebarNotes tags={tags} />
    </div>
  );
};

export default NotesSidebar;
