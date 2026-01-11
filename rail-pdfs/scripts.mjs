import path from 'path'

const resolvePaths = paths => paths.map(p => path.join(import.meta.dirname, p))

export default {
  cwd: import.meta.dirname,
  commands: [
    [
      '--shift-op-day', '--default-month=January',
      ...resolvePaths([
        'geelong-west-tarneit/100-Geelong-Waurn-Ponds-temp-timetable-web-12-160126-v1.pdf',
        'geelong-west-tarneit/100-Geelong-Waurn-Ponds-temp-timetable-web-17-180126-v1.pdf',
        'geelong-west-tarneit/100-Geelong-Waurn-Ponds-temp-timetable-web-19-230126-v1.pdf'
      ])
    ], [
      '--shift-op-day', '--default-month=January',
      ...resolvePaths([
        'geelong-west-tarneit/100-Geelong-Waurn-Ponds-v-Werribee-temp-timetable-web-12-160126-v1.pdf',
        'geelong-west-tarneit/100-Geelong-Waurn-Ponds-v-Werribee-temp-timetable-web-19-230126-v1.pdf',
        'geelong-west-tarneit/100-Geelong-Waurn-Ponds-v-Werribee-temp-timetable-web-110126-v1.pdf'
      ])
    ], [
      '--shift-op-day', '--default-month=January',
      ...resolvePaths([
        'geelong-west-tarneit/100-Tarneit-temp-timetable-web-12-160126-v1.pdf',
        'geelong-west-tarneit/100-Tarneit-temp-timetable-web-17-180126-v1.pdf',
        'geelong-west-tarneit/100-Tarneit-temp-timetable-web-19-230126-v1.pdf'
      ])
    ],
    [
      '--shift-op-day', '--default-month=January', '--change-op-day=20260111=20260118',
      resolvePaths(['geelong-west-tarneit/100-Geelong-Waurn-Ponds-v-Werribee-temp-timetable-web-17-180126-v1.pdf'])[0]
    ],
    [
      ...resolvePaths([
        'ballarat-melton-upgrade/307-Maryborough-temp-timetable-web-12-160126-v1.pdf',
        'ballarat-melton-upgrade/307-Maryborough-temp-timetable-web-17-180126-v1.pdf',
        'ballarat-melton-upgrade/307-Maryborough-temp-timetable-web-19-230126-v1.pdf',
        'ballarat-melton-upgrade/307-Maryborough-temp-timetable-web-110126-v1.pdf',
      ])
    ], [
      '--coach-only',
      '--change-op-day=Monday to Friday=12 & 13 & 14 & 15 & 16 & 19 & 20 & 21 & 22 & 23 January',
      '--change-op-day=Saturday=17 January',
      '--change-op-day=Sunday=11 & 18 January',
      resolvePaths(['geelong-west-tarneit/110-Warrnambool-Temp-BLOB-11-23Jan2026-v1.pdf'])[0]
    ]
  ]
}