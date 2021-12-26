import { TaskDialogueComponent } from './../task-dialogue/task-dialogue.component';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'to-do-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[DialogService,MessageService]
})
export class ListComponent implements OnInit {
  counter: number = 1;
  constructor(
    public dialogService: DialogService,
    private messageService: MessageService
  ) {}
  listOfTask = [];
  ref: DynamicDialogRef;

  ngOnInit(): void {}

  /**
   * Adds new task on clicking add button
   * @param none
   * @returns void
   */
  addTask(): void {
    // this.listOfTask.push(
    //   `${this.setSubscriptsOrdinals(this.counter)} new task added...`
    // );
    this.openAddTaskDialog(this.setSubscriptsOrdinals(this.counter));
    this.counter++;
  }

  /**
   * Sets subscript ordinals
   * @param counter number
   * @param ordinals string has default value and do not use this parameter
   * @returns string
   */
  private setSubscriptsOrdinals(
    counter: number,
    ordinals: string = ''
  ): string {
    switch (counter) {
      case 1:
        ordinals = '1st';
        break;
      case 2:
        ordinals = '2nd';
        break;
      case 3:
        ordinals = '3rd';
        break;
      default:
        ordinals = `${counter}th`;
    }
    return ordinals;
  }

  /**
   * opens add task dialog box
   * @param subscriptedNumber string 
   */
  openAddTaskDialog(subscriptedNumber: string): void {
    this.ref = this.dialogService.open(TaskDialogueComponent, {
      header: 'Add task',
      width: '70%',
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((task: any) => {
      if (task) {
        this.listOfTask.push(task);
        this.messageService.add({
          severity: 'info',
          summary: `${subscriptedNumber} task added.`,
        });
      }
    });
  }
}
