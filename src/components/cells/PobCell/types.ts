import { CellDataBase } from "@project/state/realtime";

export interface PobCellData extends CellDataBase {
  type: "Pob",
  build: string;
  decodedBuild: {
    build: {
      level: string;
      bandit: string;
      className: string;
      ascendClassName: string;
      mainSocketGroup: string;
      pantheonMajorGod: string;
      pantheonMinorGod: string;
      playerStat: {
        stat: string;
        value: string;
      }[]
    },
    items: {
      activeItemSet: string;
      useSecondWeaponSet: string;
      items: {
        value: string;
        modRanges: {
          range: string;
          id: string;
        }[]
      }[]
    },
    tree: {
      activeSpec: string;
      spec: {
        classId: string;
        ascendClassId: string;
        treeVersion: string;
        masteryEffects: string;
        nodes: string;
        url: string;
      }
    }
  }
}