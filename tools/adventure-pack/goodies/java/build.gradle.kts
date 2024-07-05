import org.gradle.api.tasks.testing.logging.TestExceptionFormat

plugins {
    java
}

sourceSets {
    main {
        java {
            srcDirs(".")
            include("**/Main.java")

            exclude(".gradle/**")
            exclude("gradle/**")
            exclude("build/**")
        }
    }
    test {
        java {
            srcDirs(".")
            include("**/Test.java")

            exclude(".gradle/**")
            exclude("gradle/**")
            exclude("build/**")
        }
    }
}

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.10.3"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.test {
    useJUnitPlatform()
    testLogging {
        events("failed", "passed", "skipped", "standard_error", "standard_out")

        exceptionFormat = TestExceptionFormat.FULL
    }
}
