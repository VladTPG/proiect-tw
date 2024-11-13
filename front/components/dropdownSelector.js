import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import projects from "@/dummy-data/projects";
import users from "@/dummy-data/users";
import SelectorItem from "@/components/selectorItem";

export default function Select40() {
    return (
        <div className="space-y-2">
            <Select defaultValue="option1">
                <SelectTrigger
                    id="select-40"
                    className="h-auto ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
                >
                    <SelectValue placeholder="Choose a project"/>
                </SelectTrigger>
                <SelectContent
                    className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">

                    {projects.length > 0 ? projects.map((project) => (
                            <SelectItem key={project.id} value={`option${project.id}`}>
                                <SelectorItem key={project.id}
                                              iconURL={`https://avatar.iran.liara.run/public/${project.id}`}
                                              projectName={project.title}
                                              projectID={users.find(user => user.id === project.managerFK).displayName}
                                />
                            </SelectItem>
                        )) :
                        <SelectItem value="option1">
                            <div className={"justify-items-start text-start"}>
                                No projects found.
                                <br/>
                                Please <b>join</b> or <b>create</b> a project
                            </div>
                        </SelectItem>
                    }

                </SelectContent>
            </Select>
        </div>
    );
}
