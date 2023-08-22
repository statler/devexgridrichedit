import { Component, ElementRef, OnDestroy, AfterViewInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { create, createOptions, RichEdit, ViewType, DocumentFormat, RibbonTab, RibbonTabType, HomeTabItemId, InsertTabItemId, RibbonButtonItem, RibbonMenuItem } from 'devexpress-richedit';
import DevExpress from 'devextreme';
@Component({
  selector: 'app-richedit',
  template: '<div></div>',
  styleUrls: ['./richedit.component.scss']
})
export class RicheditComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input()
  set rtf(rtf: string) {
    this._rtf = rtf;
  }
  @Output() rtfChange = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<string>();

  private _rtf = '';
  private rich: RichEdit | null = null;

  private _isLoaded = false;

  constructor(private element: ElementRef) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    //If the binding is changed, then update
    if (this.rich && changes.rtf.currentValue && !this._isLoaded) {
      this.rich.openDocument(this._rtf, 'DocumentName', DocumentFormat.Rtf);
      this._isLoaded = true;
    }
  }

  ngAfterViewInit(): void {
    const options = createOptions();
    // set options
    options.view!.viewType = ViewType.Simple;
    options.view!.simpleViewSettings!.paddings = {
      left: 15,
      top: 15,
      right: 15,
      bottom: 15,
    };
    options.width = '100%';
    options.height = '400px';
    var derp = this.rtfChange;
    options.events.documentChanged = (s, e) => {
      s.exportToBase64((res) => {
        this.rtfChange.emit(res);
      })
    };
    this.rich = create(this.element.nativeElement.firstElementChild, options);
    this.rich.updateRibbon(function (ribbon) {
      var _home = ribbon.getTab(RibbonTabType.Home);
      var _insert = ribbon.getTab(RibbonTabType.Insert);
      ribbon.clearTabs();
      ribbon.insertTab(_home);
      var _insertTable = _insert.getItem(InsertTabItemId.ShowInsertTableDialog) as RibbonMenuItem;
      var _insertPicture = _insert.getItem(InsertTabItemId.InsertPictureLocally) as RibbonMenuItem;
      var _insertLink = _insert.getItem(InsertTabItemId.ShowHyperlinkDialog) as RibbonMenuItem;
      _home.insertItemBefore(_insertTable, HomeTabItemId.ToggleShowHiddenSymbols);
      _home.insertItemBefore(_insertPicture, HomeTabItemId.ToggleShowHiddenSymbols);
      _home.insertItemBefore(_insertLink, HomeTabItemId.ToggleShowHiddenSymbols);
      ribbon.visible = true;
    });
    if (this._rtf && !this._isLoaded) {
      this.rich.openDocument(this._rtf, 'DocumentName', DocumentFormat.Rtf);
      this._isLoaded = true;
    }
    let elements = this.element.nativeElement.querySelectorAll('.dx-tabpanel-tabs');
    elements[0].style.visibility = 'collapse';
  }


  ngOnDestroy() {
    this.onClose.emit(this.rtf);

    if (this.rich) {
      this.rich.dispose();
      this.rich = null;
    }

  }


}
